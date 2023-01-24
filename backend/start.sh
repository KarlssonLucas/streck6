wait_for_postgres() (
    first_iteration=true
    while ! pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -q; do
        if [ -n "$first_iteration" ]; then
            printf "Waiting for db \"postgresql://%s@%s:%s\"" "$POSTGRES_USER" "$POSTGRES_HOST" "$POSTGRES_PORT"
            unset first_iteration
        else
            printf "."
        fi

        sleep 1
    done
    if [ -z "$first_iteration" ]; then echo; fi
)

wait_for_postgres

npm start

exit 1