# Task Management Tool
ReactJS &amp; Django based dashboard for task management and progress tracking. The frontend is built using `react`, which uses `django-react-framework` API to interact with the django based backend server. The application is hosted locally , and was created as a response to address supply-chain shortages during Covid-19 lockdowns. The primary use of application was to track the on-boarding process for new suppliers.

# Setup
- create a virutal env &amp; install requirements
```python
python -m venv env
source env\bin\activate
pip install -r requirements.txt
```

- start django server
```python
python ss\manage.py runserver
```
The application uses a knox based authentication to restrict unauthorised access.

Default-  username: admin , password: admin

# Screenshots

![1](https://user-images.githubusercontent.com/91971064/166229355-15a11909-bac0-444a-a3ca-f7c786bf14e3.PNG)

![2](https://user-images.githubusercontent.com/91971064/166230089-bdea58c7-ebee-45c4-917c-ff915d9f9986.PNG)

![3](https://user-images.githubusercontent.com/91971064/166230093-790fe6eb-8626-4c5f-a258-6b45cbef7868.PNG)
