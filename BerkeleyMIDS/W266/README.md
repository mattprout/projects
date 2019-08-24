## NLP with Deep Learning Team Project: Sentiment Classification on Amazon Fine Food Reviews and Beyond

### Team Members: David Lawrence, Matt Prout

&nbsp;
The public repository for the project can be found [here](https://github.com/dlarance/w266_final_project)
&nbsp;

The purpose of our project was to train and optimize a sentiment classification model in one domain and then measure sentiment accuracy across other domain data sets.  The primary model was built using the Amazon Food review data sets. It was tested on Yelp restaurant, RateBeer beer, and IMDb movie reviews.

We performed EDA, and researched NLP techniques for sentiment analysis.  We created two baseline models which were Naïve Bayes and Neural Bag of Words.

For our LSTM model, we created a one layer LSTM RNN using Tensor Flow.  The length was 267, based on 95% coverage of the Amazon reviews.  The word embedding dimension was 50.  We used Glove word embeddings.  The accuracy was 87%, the same as Naïve Bayes.  Then we trained several models, trying several optimizations:
1. We created a two layer LSTM model, which improved the accuracy above 90%.
2. Other changes we tried that did not help: adding dropout, fixing misspellings.

With our final model, we did cross domain testing, and an analysis of the errors (why there were mis-predictions on the other data sets).

From our error analysis, it is clear that sentiment classification is a difficult problem as the reviews and ratings have short comings:
1. Reviews may be fact heavy and there is co-mingling of reviews.
2. Some reviews are given a domain specific rating.
3. Users gave an incorrect rating.

Conclusions:
If the reviews did not have food overlap, then the accuracy was worse.  Also classification is worse for long reviews, reviews with sarcasm / complex phrasing, or domain specific words.

Here is the [project report](./W266_Project_Report.pdf).
Here is the [presentation](./W266_Project_Presentation.pdf) we gave for the project.

