# fideligard

An AngularJS single-page web application using UI-Router multi-view states, NoSQL data modeling, and modular code to create a historical stock portfolio simulator with trading data via the Yahoo Finance API.

To fire on local server, `git clone` the repository and run `ruby -run -e httpd . -p 3000`.

![Welcome]()

## Features

### User Flow

- Users are prompted to begin trading after stock data loads.
- Via the stocks panel, users enter trades through the trade form, where fields are auto-populated with respective stock and date info. 
- Submission disabled if user attempts to buy more stocks than their available cash, or sell more quantity than they own.

![Trade]()

- All transactions up to selected date can be sorted according to date, price, ticker, or type (buy/sell).

![Transactions]()

- User's portfolio updates according to selected date, as adjusted through the date slider.

![Portfolio]()
