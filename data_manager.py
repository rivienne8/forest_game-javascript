from psycopg2.extras import RealDictCursor
import database_common


@database_common.connection_handler
def add_player_and_scores(cursor: RealDictCursor, player_name: dict):
    query = f"""
        INSERT INTO players ("name", scores)
        VALUES ((%(name)s), 0)
        RETURNING id
        """
    cursor.execute(query, player_name)
    return cursor.fetchone()


@database_common.connection_handler
def get_all_data(cursor: RealDictCursor):
    query = f"""
        SELECT name, scores 
        FROM players
        ORDER BY scores DESC
        FETCH FIRST 5 ROWS ONLY
        """
    cursor.execute(query)
    return cursor.fetchall()
