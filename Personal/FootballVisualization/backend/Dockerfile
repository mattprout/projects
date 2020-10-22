FROM python:3.6

RUN mkdir -p /home/ubuntu/flask_deploy/
WORKDIR /home/ubuntu/flask_deploy/

ADD requirements.txt ${WORKDIR}

# Install requirements
RUN pip3 install -r requirements.txt

# Copy flask deployment over
ADD api.py ${WORKDIR}

# expose the port 5000
EXPOSE 5000

# define the default command to run when starting the container
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "api:app"]
