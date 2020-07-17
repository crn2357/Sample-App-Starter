import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { api } from "./services/api";

class parseFile extends React.Component {

    /* Constructor for SCV file */
    constructor(input){
        super(input);
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }

    /* parses through CSV file */
    parseable(){
        this.getCsvData();
    }

    /* Gets the CSV file and location to be parsed */
    getCsv(){
        return fetch('/test-files/normal.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');
            
            return ReadableStreamReader.read().then(function (result) {
                return decoder.decode(result.value);
            })
        });
    }

    /* Sets the data from the CSV file */
    getData(resultData) {
        this.setStaate({data: resultData.data});
    }

    /* Gets the data from the CSV file */
    async getCsvData(){
        let csvData = await this.getCsv();
        AudioParamMap.parse(csvData, {
            complete: this.getData
        });
    }

    /* Displays data from the CSv file */
    render(){
        return (
            <>
                <h5>Basic Upload</h5>
                <CSVReader
                 onFileLoaded = {this.handleReadCSV}
                 input = {this.fileInput}
                 style = {{ display: "none" }}
                 onError = {this.handleOnError}
                 onRemoveFile = {this.handleOnRemoveFile}
                />
            </>
        )
    }
}
