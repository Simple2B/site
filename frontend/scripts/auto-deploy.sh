#!/bin/bash
check_and_run_deploy () {

    git fetch

    UPSTREAM=${1:-'@{u}'}
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse "$UPSTREAM")
    BASE=$(git merge-base @ "$UPSTREAM")

    if [ $LOCAL = $REMOTE ]; then
        # echo "Up-to-date"
        echo -n .
    elif [ $LOCAL = $BASE ]; then
        echo `date` "Need to pull"
        echo `date` "Pulling..."
        git pull
        echo `date` Restart docker...
        docker-compose down; docker-compose up --build -d
        echo `date` Done.
    elif [ $REMOTE = $BASE ]; then
        echo "Need to push"
    else
        echo "Diverged"
    fi
}

loop_run () {
    LOOP_TIMEOUT=30

    echo "Press [CTRL+C] to stop.."
    while :
    do
        check_and_run_deploy
        sleep $LOOP_TIMEOUT
    done
}


case "$1" in
    -h|--help)
        echo "$package - auto-deploy script. Check if version under GIT, than update local files and deploy site"
        echo " "
        echo "$package [options] application [arguments]"
        echo " "
        echo "options:"
        echo "-h, --help                show brief help"
        echo "-l, --loop                run in endless loop"
        exit 0
        ;;
    -l|--loop)
        loop_run
        exit 0
        ;;
    *)
        # run single check
        check_and_run_deploy
        ;;
esac


