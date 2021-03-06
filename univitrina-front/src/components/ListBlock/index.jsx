import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography } from '@material-ui/core';
import CardOnListPage from '../CardOnListPage';
import useIsNotMobie from '../../hooks/useIsNotMobile/useIsNotMobile';
import useStyles from './style';
import MainContainer from '../MainContainer';
import FilterOnListPage from '../FilterOnListPage';
import dynamicTitle from '../../common/dynamicTitle';
import SearchOnListPage from '../SearchOnListPage';

function DropDownList(params) {
  const { list, path, sublistPath, sublistDeclension } = params;
  if (list === null) return null;
  if (path === '/professions')
    return list.map(({ name, description, id, specialties }) => (
      <CardOnListPage
        key={id}
        id={id}
        sublist={specialties}
        title={name}
        description={description}
        pagePath={path}
        sublistPath={sublistPath}
        sublistDeclension={sublistDeclension}
      />
    ));
  if (path === '/specializations')
    return list.map(({ name, description, id, professionList }) => (
      <CardOnListPage
        key={id}
        id={id}
        sublist={professionList}
        title={name}
        description={description}
        pagePath={path}
        sublistPath={sublistPath}
        sublistDeclension={sublistDeclension}
      />
    ));
  if (path === '/universities')
    return list.map(({ name, description, id, specialtyList }) => (
      <CardOnListPage
        key={id}
        id={id}
        sublist={specialtyList}
        title={name}
        description={description}
        pagePath={path}
        sublistPath={sublistPath}
        sublistDeclension={sublistDeclension}
      />
    ));
  return <></>;
}

function ListBlock(params) {
  const {
    queryUrlParameterNames,
    queryParameterText,
    path,
    declensionList,
    sublistPath,
    sublistDeclension,
    getFilteredListRequest,
    getParametersVariantsRequest,
  } = params;

  const classes = useStyles();

  const isNotMobile = useIsNotMobie();
  const spacing = isNotMobile ? 4 : 2;

  const UrlSearch = useLocation().search;

  const [query, setQuery] = useState(new URLSearchParams(useLocation().search));
  const [queryParameters, setQueryParameters] = useState([]);

  useEffect(() => {
    setQuery(new URLSearchParams(UrlSearch));
  }, [UrlSearch]);

  useEffect(() => {
    setQueryParameters(queryUrlParameterNames.map((name) => query.get(name)));
  }, [query, queryUrlParameterNames]);

  const [parametersVariants, setParametersVariants] = useState({});

  const getParametersVariants = useCallback(async () => {
    const response = await getParametersVariantsRequest();
    setParametersVariants(response);
  }, [getParametersVariantsRequest]);

  useEffect(() => {
    getParametersVariants();
  }, [getParametersVariants]);

  const [filterList, setFilterList] = useState(null);

  const getFilterList = useCallback(async () => {
    const response = await getFilteredListRequest(UrlSearch);
    setFilterList(response);
  }, [UrlSearch, getFilteredListRequest]);

  useEffect(() => {
    getFilterList();
  }, [getFilterList, parametersVariants]);

  return (
    <>
      <SearchOnListPage textToSearch={query.get('text')} path={path} />
      <MainContainer fixed={isNotMobile}>
        <Typography className={classes.title} variant="h2">
          {dynamicTitle(filterList, query.get('text'), declensionList)}
        </Typography>
        <Grid container justify="flex-end" spacing={spacing}>
          <Grid item xs="auto" sm={12} md={4} lg={4}>
            <Box className={classes.filter}>
              {queryUrlParameterNames
                .filter((urlParameterName) => urlParameterName !== 'text')
                .map((urlParameterName, index) => (
                  <FilterOnListPage
                    key={urlParameterName}
                    urlParameterName={urlParameterName}
                    queryParameterValue={queryParameters[index]}
                    queryParameterText={queryParameterText[index]}
                    pagePath={path}
                    parametersVariants={parametersVariants}
                    query={query}
                  />
                ))}
            </Box>
          </Grid>
          <Grid item xs="auto" sm={12} md={8} lg={8}>
            <DropDownList
              list={filterList}
              path={path}
              sublistPath={sublistPath}
              sublistDeclension={sublistDeclension}
            />
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}

export default ListBlock;
