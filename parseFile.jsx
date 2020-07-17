import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { api } from "./services/api";

class parseFile extends React.Component {

    constructor(input){
        super(input);
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }

    parseable(){
        this.getCsvData();
    }

    getCsv(){
        return fetch('/test-files/normal.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');
            return ReadableStreamReader.read().then(function (result) {
                return decoder.decode(result.value);
            })
        });
    }

    getData(resultData) {
        this.setStaate({data: resultData.data});
    }

    async getCsvData(){
        let csvData = await this.getCsv();
        AudioParamMap.parse(csvData, {
            complete: this.getData
        });
    }

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