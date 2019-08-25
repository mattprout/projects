# Topic Modeling Web API

## Directory Structure:


\TopicModelingWebAPI<br>
&nbsp;&nbsp;&nbsp;&nbsp;\state\Temp<br>
&nbsp;&nbsp;&nbsp;&nbsp;\state\TopicData<br>
&nbsp;&nbsp;&nbsp;&nbsp;EmailHelperFunctions.py<br>
&nbsp;&nbsp;&nbsp;&nbsp;MDS.py<br>
&nbsp;&nbsp;&nbsp;&nbsp;TopicModeling.py<br>
&nbsp;&nbsp;&nbsp;&nbsp;TopicModelingAPI.py<br>
&nbsp;&nbsp;&nbsp;&nbsp;CreateTopicModelingThread.py<br>
&nbsp;&nbsp;&nbsp;&nbsp;CreateTopicData.py<br>

## Prerequisite:
1. Packages: flask, gensim, wordcloud, neo4j, scikit-learn
2. Download and extract Mallet: http://mallet.cs.umass.edu/dist/mallet-2.0.8.zip.  Note that Mallet requires Java.
3. Edit TopicModeling.py to set the paths for Mallet
4. Create the Temp and TopicData folders
5. Download NLTK stopwords and wordnet if necessary:

import nltk<br>
nltk.download('stopwords')<br>
nltk.download('wordnet')<br>

## If using TopicModeling2:

Create the topic data by running:<br>
python3 CreateTopicData.py<br>

Edit TopicModelingAPI.py and make two changes:
1. At the top of TopicModelingAPI.py, import TopicModeling2 instead of TopicModeling.
2. At the top of TopicModelingAPI.py, assign 'tm' to a TopicModeling2 object instead of a TopicModeling object.

## Running Flask:

Windows:<br>
set FLASK_APP=TopicModelingAPI.py<br>
flask run<br>

Linux:<br>
FLASK_APP=TopicModelingAPI.py flask run<br>


## Web API for TopicModeling2:

The API should be callable using REST calls from the website.

**Determine the optimal number of topics.**<br>
GET	/TM/topics<br>

**Get a word cloud for a topic**<br>
GET	/TM/topics/\<id\>?numTopics=\<model size\><br>

**Get a visualization of the topic distribution data. Returns a JSON array of data points representing the topic distribution.**<br>
GET	/TM/topicdistributiondata<br>?numTopics=\<model size\><br>

**Get the documents Ids for a topic. These IDs can be passed to the email viewer to display emails for a topic.**<br>
GET	/TM/topics/\<id\>/documents?numTopics=\<model size\><br>

Example:<br>
/TM/topics/0/documents<br>

**Get the number of models.**<br>
GET	/TM/nummodels<br>

