# Election Voting Data Visualization
The application is hosted at the following URL:
https://dataviz-prj2-voting-app.herokuapp.com/

The aim of this project is to create a page that contains data visualizations that provide detailed information on votes for previous US elections. As a proof of concept, the website currently displays the results for the 2012 and 2016 elections.

The project consists of an interactive Tableau dashboard that depicts the state-by-state breakdown of how many people voted for what candidate. There are also visualizations at the bottom of the page generated with Plotly that depict detailed information on breakdowns given a user input (i.e. a specific state and election year they wish to examine).

The application is built on top of Flask, and the application is hooked up to a Postgres database that contains information extracted from public CSVs on Kaggle describing voter breakdown.
