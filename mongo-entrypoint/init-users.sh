if [ "$MONGO_INITDB_ROOT_USERNAME" ] && [ "$MONGO_INITDB_ROOT_PASSWORD" ]; then
  "${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
  db.createUser({
     user: $(_js_escape "$MONGO_INITDB_ROOT_USERNAME"),
     pwd: $(_js_escape "$MONGO_INITDB_ROOT_PASSWORD"),
     roles: [ "readWrite", "dbAdmin" ]
     })
EOJS
fi

echo ======================================================
echo created $MONGO_INITDB_ROOT_USERNAME in database $MONGO_INITDB_DATABASE
echo ======================================================


if [ "$USER" ] && [ "$PASSWORD" ]; then
  "${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
  db.createUser({
     user: $(_js_escape "$USER"),
     pwd: $(_js_escape "$PASSWORD"),
     roles: [ "readWrite", "dbAdmin" ]
     })
EOJS
fi

echo ======================================================
echo created $USER in database $MONGO_INITDB_DATABASE
echo ======================================================


