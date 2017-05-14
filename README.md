# fideligard

An AngularJS single-page web application using UI-Router multi-view states, NoSQL data modeling, and modular code to create a historical stock portfolio simulator with trading data via the Yahoo Finance API.

To fire on local server, `git clone` the repository and run `ruby -run -e httpd . -p 3000`.

![Load](https://github.com/eating247/fideligard/blob/master/screenshots/1.png)

## Features

### User Flow

- Users are prompted to begin trading after trading data loads for the specified time interval.
- Via the stocks panel, users can access the trade form, where fields are auto-populated with relevant stock information for the selected date on the slider form. 
- Submission disabled unless order status is validated.

![Trade](https://github.com/eating247/fideligard/blob/master/screenshots/2.png)

- All trades can be sorted according to date, price, ticker, or type (buy/sell).

![Transactions](https://github.com/eating247/fideligard/blob/master/screenshots/3.png)

- User's portfolio updates according to position in time, as selected through date slider.

![Portfolio](https://github.com/eating247/fideligard/blob/master/screenshots/4.png)
