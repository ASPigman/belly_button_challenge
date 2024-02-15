// The url with data
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Display the initial default data on the charts
function init() {

    // Use D3 to select the dropdown menu
    let dropDownMenu = d3.select('#selDataset');

    // Get data and console log it
    // https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js#d3.json
    // https://www.geeksforgeeks.org/why-we-use-then-method-in-javascript/ 
    d3.json(url).then((data) => {
        console.log(data);

        // An array of ids from the names field
        let names = data.names;

        // Iterate through the names array and append each item to the drop down menu
        names.forEach((name) => {
            dropDownMenu.append('option').text(name);
        });

        // Assign the first name to variable
        let name = names[0];

        // Call the functions to load the charts with data from the first name
        demographics(name);
        barChart(name);
        bubbleChart(name);
        gauge(name);
    });
}

// Demographic info chart
function demographics(selectedID) {
    // Get data and console log it
    d3.json(url).then((data) => {
        console.log(data);

        // An array of metadata
        let metadata = data.metadata;
        
        // Filter data where id = selected ID
        let filteredData = metadata.filter((meta) => meta.id == selectedID);
      
        // Clear the child elements in div with id sample-metadata
        d3.select('#sample-metadata').html('');

        // Assign the first object to a variable
        let object1 = filteredData[0]
  
        // Object.entries() is a built-in method that returns an array of an object's enumerable property
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        let demoPanel = Object.entries(object1);
        
        // Iterate through the demoPanel array
        // Add each key-value pair of ID and metadata to the div on h5 as child elements
        demoPanel.forEach(([key, value]) => {
            d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`);
        });

        // console log the demoPanel array
        console.log(demoPanel);
    });
  }
  

// Make the bar chart
function barChart(selectedID) {
    // Get data and console log it
    d3.json(url).then((data) => {
        console.log(data);

        // An array of samples
        let samples = data.samples;

        // Filter data where id = selected ID
        let filteredData2 = samples.filter((sample) => sample.id === selectedID);

        // Assign the first object to a variable
        let object2 = filteredData2[0];
        
        // Trace the data
        let trace = [{
            // Slice to get the top 10 otus
            x: object2.sample_values.slice(0, 10).reverse(),
            y: object2.otu_ids.slice(0, 10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: object2.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            marker: {
                color: 'blueviolet'
            },
            orientation: 'h'
        }];
        
        // Use Plotly to plot the data
        Plotly.newPlot('bar', trace);
    });
}
  
// Make the bubble chart
function bubbleChart(selectedID) {
    // Get data and console log it
    d3.json(url).then((data) => {

        // An array of samples
        let samples = data.samples;
    
        // Filter data where id = selected ID 
        let filteredData3 = samples.filter((sample) => sample.id === selectedID);
    
        // Assign the first object to a variable
        let object3 = filteredData3[0];
        
        // Trace the data
        let trace = [{
            x: object3.otu_ids,
            y: object3.sample_values,
            text: object3.otu_labels,
            mode: 'markers',
            marker: {
                size: object3.sample_values,
                color: object3.otu_ids,
                colorscale: 'Rainbow'
            }
        }];
    
        // Apply the x-axis legend
        let layout = {
            xaxis: {title: 'OTU ID'}
        };
    
        // Use Plotly to plot the data
        Plotly.newPlot('bubble', trace, layout);
    });
}

// Make the gauge chart 
function gauge(selectedID) {
    // Get data and console log it 
    d3.json(url).then((data) => {
        // An array of metadata
        let metadata = data.metadata;
        
        // Filter data where id = selected ID 
        let filteredData4 = metadata.filter((meta) => meta.id == selectedID);
      
        // Assign the first object to a variable
        let object4 = filteredData4[0]

        // Trace the data
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: object4.wfreq,
            title: { text: '<b>Washing Frequency</b><br>Scrubs per Week', font: {size: 24}},
            type: 'indicator', 
            mode: 'gauge+number',
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: 'rgb(239, 235, 242)'},
                steps: [
                    { range: [0, 1], color: 'rgb(196, 18, 18)'},
                    { range: [1, 2], color: 'rgb(222, 78, 78)'},
                    { range: [2, 3], color: 'rgb(232, 127, 42)'},
                    { range: [3, 4], color: 'rgb(232, 213, 42)'},
                    { range: [4, 5], color: 'rgb(197, 232, 42)'},
                    { range: [5, 6], color: 'rgb(137, 232, 42)'},
                    { range: [6, 7], color: 'rgb(42, 232, 67)'},
                    { range: [7, 8], color: 'rgb(42, 86, 232)'},
                    { range: [8, 9], color: 'rgb(103, 53, 212)'},
                    { range: [9, 10], color: 'rgb(97, 15, 168)'}
                ]
            }
        }];

         // Use Plotly to plot the data
         Plotly.newPlot('gauge', trace);
    });
}

// Update charts when user selects a different ID
function optionChanged(selectedID) {
    demographics(selectedID);
    barChart(selectedID);
    bubbleChart(selectedID);
    gauge(selectedID)
}

init();