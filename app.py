from flask import Flask, render_template, make_response, url_for, request, redirect
import data_manager

app = Flask(__name__)

PLAYER_HEADERS = ["name", "scores"]
PLAYER_KEYS = ["name", "scores"]


@app.route('/', methods=["GET", "POST"])
def add_player_name():
    if request.method == "POST":

        player_name = dict(request.form)
        player_name = data_manager.add_player_and_scores(player_name).get("id")

        return render_template("index.html",  player_name=player_name)

    if request.method == "GET":

        all_players = data_manager.get_all_data()

        return render_template("index.html", PLAYER_HEADERS=PLAYER_HEADERS, PLAYER_KEYS=PLAYER_KEYS, all_players=all_players)


if __name__ == '__main__':
    app.run()
