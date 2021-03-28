DROP TABLE IF EXISTS region, city, profession, area_education, education_program, education_profession, university, university_education;

CREATE TABLE IF NOT EXISTS region
(
    region_id   SERIAL PRIMARY KEY,
    name_region VARCHAR(255) NOT NULL UNIQUE CHECK (name_region != '')
);

CREATE TABLE IF NOT EXISTS city
(
    city_id   SERIAL PRIMARY KEY,
    name_city VARCHAR(255) NOT NULL CHECK ( name_city != ''),
    region_id INT          NOT NULL,
    FOREIGN KEY (region_id) REFERENCES region (region_id)
);


CREATE TABLE IF NOT EXISTS profession
(
    profession_id   SERIAL PRIMARY KEY,
    id_in_hhapi     VARCHAR(15)  NOT NULL,
    name_profession VARCHAR(255) NOT NULL UNIQUE CHECK (name_profession != '')
);

CREATE TABLE IF NOT EXISTS area_education
(
    area_education_id   SERIAL PRIMARY KEY,
    name_area_education VARCHAR(255) NOT NULL,
    code_area_education VARCHAR(8)   NOT NULL UNIQUE CHECK (code_area_education != '')
);

CREATE TABLE IF NOT EXISTS education_program
(
    education_program_id   SERIAL PRIMARY KEY,
    name_education_program VARCHAR(255) NOT NULL,
    code_education_program VARCHAR(8)   NOT NULL UNIQUE CHECK (code_education_program != ''),
    degree                 VARCHAR(255) NOT NULL,
    area_education_id      INT          NOT NULL,
    FOREIGN KEY (area_education_id) REFERENCES area_education (area_education_id)
);

CREATE TABLE IF NOT EXISTS education_profession
(
    education_profession_id SERIAL PRIMARY KEY,
    education_program_id    INT NOT NULL,
    profession_id           INT NOT NULL,
    FOREIGN KEY (education_program_id) REFERENCES education_program (education_program_id),
    FOREIGN KEY (profession_id) REFERENCES profession (profession_id)
);

CREATE TABLE IF NOT EXISTS university
(
    university_id   SERIAL PRIMARY KEY,
    name_university VARCHAR(255) NOT NULL UNIQUE CHECK (name_university != ''),
    city_id         INT          NOT NULL,
    address         VARCHAR(255) NOT NULL,
    phone           VARCHAR(255) NOT NULL,
    email           VARCHAR(255),
    site            VARCHAR(255),
    FOREIGN KEY (city_id) REFERENCES city (city_id)
--     wiki_url VARCHAR(255) NOT NULL,
--     is_state BOOLEAN,
--     has_hostel BOOLEAN
);

CREATE TABLE IF NOT EXISTS university_education
(
    university_education_id SERIAL PRIMARY KEY,
    education_program_id    INT NOT NULL,
    university_id           INT NOT NULL,
    recruitment_plan_budget INT,
    score_budget_basis      INT,
    recruitment_plan_paid   INT,
    score_paid_basis        INT,
    cost_per_year           INT,
    FOREIGN KEY (education_program_id) REFERENCES education_program (education_program_id),
    FOREIGN KEY (university_id) REFERENCES university (university_id)
);



