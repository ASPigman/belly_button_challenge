# Belly Button Challenge
The goal of this challenge is to practice building an interactive dashboard using JavaScript, D3, and Plotly to explore data regarding belly button microbe biodiversity. The dataset catalogs the microbes that colonize human navels.  It reveals that a certain microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while others were relatively rare.


## Method
First, I set the API link as a constant variable in order to load the data into the functions I planned to create for each chart. I had to research how to load in data from an API and found this link (‘https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js#d3.json’)  helpful. 

Based on lessons and activities taught in class, I understood that it’s important to set up the initial information that shows up when you open the HTML in a browser. After setting up the init() function, the research I had done on working with data from APIs led me to understand that I need to call on that API and gather the data from it using d3.json() and .then(). I verified that process worked by console logging the data gathered. Because of past experiences with coding in Python, I understood I would need to repeat this process for each function created. After getting the data, I collected an array of the IDs listed in the ‘names’ field. I knew I needed to read through and gather each ID from that array and append to the dropdown menu. I accomplished this by researching the best way to iterate and found that the forEach() method seemed to be the most applicable and paired it with an arrow function. From there, I was able to call upon the first value using indexing. I closed the function and then began building the next function.

Then, I used the structure of the HTML file as a guide to the order in which I should create the chart functions. The demographic info panel was listed first after the drop down menu, so I began by setting a function up for that. I included the user selected ID from the drop down menu as the argument placed within the function and called it ‘selectedID’. I made a variable, ‘metadata’ for an array for metadata per ID. Then, I created another variable, ‘filteredData’, that filtered that metadata based on the ID. I used d3.select() and .html() with a blank content parameter to clear out the data for child elements. The next step I took was to assign a variable, ‘object1’ to the first ID and the metadata associated with it. I used the Object.entries() method on ‘object1’ and assigned it to another variable I called ‘demoPanel’ as a way to grab the key and value pair. Then I was able to iterate through the IDs using the forEach() method on ‘demoPanel’ and add the metadata information for each ID to the demographics chart.

The next chart listed in the HTML is the bar chart. From the challenge description, the bar chart should consist of the top ten operational taxonomic units (OTUs), which are microbe identifiers, present in the subject’s navel. After creating the function and accessing the data, I created a variable ‘samples’ that pulled the sample information containing the needed OTU data. Just as I did with the drop down menu in the previous step, I created another variable (‘filteredData2’) that represented the OTU data matched with the ID selected from the drop down menu. I then created another variable (‘object2’) representing the first result of the filteredData2 variable. With that, I created a trace for the filteredData2 to identify the x and y values, as well as other customization parameters for the bar graph. It is within the trace that I used .slice() to pull only the top ten most numerous microbes present and .map() to grab the associated OTU labels. After that, I plotted the graph using Plotly and included the html position and the trace I created as parameters.

After that, I created a bubble chart that gave a visual of the number of each microbe present in the sample. I followed the same steps as I did for the bar chart but the trace included bubble chart specific parameters. I used layout to add a title to the x-axis. Then, plotted the graph using Plotly and passed the html position, the trace I created, and the layout as parameters.

Then, using much the same process as the bar and bubble chart, I created a function for the gauge chart that represented the number of times the subject washed their navel per week. I used and modified the custom gauge chart code provided in the Plotly documentation here (‘https://plotly.com/javascript/gauge-charts/’).

Lastly, I created a function based on what I saw in the HTML document by the ‘selDataset’ id div. I understood from that, this function would update the information displayed on the charts once a user selected a new ID from the dropdown. 

![dashboard](https://github.com/ASPigman/belly_button_challenge/assets/145923874/fa132db5-abd0-4eb4-aefc-c95739e18660)


## Acknowledgements

Othmane Benyoucef - Instructor for Tulsa Community College Data Analytics Accelerated Training Program

Kaylie Butler - TA

Jacob Peroutek - TA

<a href="https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js#d3.json" target="_blank">Tutorials Teacher</a>

<a href="https://plotly.com/javascript/gauge-charts/" target="_blank">Plotly documentation</a>
