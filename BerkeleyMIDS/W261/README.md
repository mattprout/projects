## Machine Learning at Scale Team Project: Criteo Click Through Rate Prediction

### Team Members: Ben Thompson, Kevin Gifford, Dan VanLunen, Matt Prout

&nbsp;
The public repository for the project can be found [here](https://github.com/ksgifford/W261_Final_CTR)
&nbsp;

For the final project of W261, we were asked to perform click through rate prediction on the Criteo data set (http://labs.criteo.com/2014/09/kaggle-contest-dataset-now-available-academic-use/).

This data set is very large (the training data is over 11GB), and it required working with a sample of the data for our EDA.

We did extensive EDA, looking at correlation among variables, class balance, types of variables, and missing variables.

Feature engineering was required for categorical variables, and we used both one hot encoding and the hash trick.

The algorithm we used for our model was logistic regression.  We developed it from scratch using the Spark framework.  Because we were using gradient descent, we also had to normalize the data.  By combining the normalization and imputation code, we were able to reduce the number of passes on the large data set.

Initial training conducted on 1% sample of the data to establish preliminary coefficients, using both L1 and L2 regularization. Using this method, training the full model required many fewer iterations to converge than training the sampled dataset.

Here is the [presentation](./W261-Fall2018FinalProjectPresentation.pdf) we gave for the project.

