import pandas as pd
from flask import Flask
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import requests
import json
from datetime import date

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
url = "https://www.pro-football-reference.com/years/2020/passing.htm"

currentDay = None
df = None

def get_data_from_website():
    '''Screen scrapes the given URL for QB statistics'''

    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")
    table = soup.find('table', attrs={'class':'per_match_toggle sortable stats_table'})
    rows = table.tbody.find_all('tr')
    players, completion_pct, td_pct, intercept_pct, yds_pass_attmpt = [],[],[],[],[]

    for row in rows:
    
        if row.get('class') != None:
            break
    
        players.append(row.find("td", attrs={'data-stat': 'player'}).a.string.strip())
        completion_pct.append(float(row.find("td", attrs={'data-stat': 'pass_cmp_perc'}).string.strip()))
        td_pct.append(float(row.find("td", attrs={'data-stat': 'pass_td_perc'}).string.strip()))
        intercept_pct.append(float(row.find("td", attrs={'data-stat': 'pass_int_perc'}).string.strip()))
        yds_pass_attmpt.append(float(row.find("td", attrs={'data-stat': 'pass_yds_per_att'}).string.strip()))

    return pd.DataFrame({'Player': players, 'PassCompletionPct': completion_pct, 'PassingTDPct': td_pct, 'PassInterceptPct': intercept_pct, 'YdsPerPassAttempt': yds_pass_attmpt})


@app.route('/api/QBStats')
@cross_origin()
def get_quarterback_statistics():
    '''Implements an endpoint to obtain the QB statistics as JSON.
       Returns the date the data was read, followed by the data for each player.'''

    global currentDay
    global df

    today = date.today()

    # Read the data only for a new day

    if today.day != currentDay:

        #df = pd.read_csv('./PlayerStats.csv')
        df = get_data_from_website()

        currentDay = today.day

    stats = json.loads(df.to_json(orient="records"))

    outputObject = {
        'Date': today.strftime("%B %d, %Y"),
        'Stats': stats
    }

    response = app.response_class(
        response=json.dumps(outputObject),
        status=200,
        mimetype='application/json'
    )

    return response
