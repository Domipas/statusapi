#!/bin/sh
node ./build/index.js &
export APP_PID=$!
sleep 7
node ./tests/test.js
sleep 5
export TEST_CODE=$?
export TEST_PID=$!
kill -9 $APP_PID
kill -9 $TEST_PID
echo $TEST_CODE
exit $TEST_CODE