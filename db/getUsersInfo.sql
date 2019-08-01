SELECT password, balance, first_name, last_name FROM bank_user
WHERE username = $1;