from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('API_KEY')

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Missing query parameter'}), 400

    try:
        headers = {
            'Authorization': API_KEY
        }

        # Normalize the query to lowercase for case-insensitive search
        query = query.lower()

        # Split the query into parts, assuming it could be a full name
        parts = query.split(' ')
        
        # If the query is a full name (two parts)
        if len(parts) == 2:
            first_name, last_name = parts
            
            # Search with first and last name
            response = requests.get(f'https://api.balldontlie.io/v1/players?search={last_name}', headers=headers)
            response.raise_for_status()
            data = response.json()

            # Filter results manually to find an exact match for first and last name
            matched_players = [player for player in data['data'] if player['first_name'].lower() == first_name and player['last_name'].lower() == last_name]

            if not matched_players:
                return jsonify({'error': 'Player not found'}), 404

            # Get the detailed information of the matched player
            player_id = matched_players[0]['id']
            player_response = requests.get(f'https://api.balldontlie.io/v1/players/{player_id}', headers=headers)
            player_response.raise_for_status()
            player_data = player_response.json()

            return jsonify(player_data)
        
        else:
            # Fall back to searching by just the last name if the query is a single word
            response = requests.get(f'https://api.balldontlie.io/v1/players?search={query}', headers=headers)
            response.raise_for_status()
            data = response.json()

            if not data['data']:
                return jsonify({'error': 'Player not found'}), 404

            # Get the detailed information of the first matched player
            player_id = data['data'][0]['id']
            player_response = requests.get(f'https://api.balldontlie.io/v1/players/{player_id}', headers=headers)
            player_response.raise_for_status()
            player_data = player_response.json()

            return jsonify(player_data)

    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching player data: {e}")
        return jsonify({'error': 'Failed to fetch data from the API'}), 500
    except ValueError as e:
        app.logger.error(f"JSON decoding error: {e}, response content: {response.text}")
        return jsonify({'error': 'Invalid response format'}), 500

if __name__ == '__main__':
    app.run(debug=True)
