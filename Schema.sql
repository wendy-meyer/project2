-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "US_Presidents_data" (
    "year" char(6)   ,
    "state" varchar(256)   ,
    "party" varchar(256)   ,
    "candidate" varchar(256)   ,
    "writein" varchar(256)   ,
    "candidatevotes" float  ,
    "totalvotes" float
);

SELECT *
FROM "US_Presidents_data";

