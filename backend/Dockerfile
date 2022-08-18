FROM python:3.7.13-alpine3.16

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 6969

ENV FLASK_DEBUG=0

ENTRYPOINT [ "python3", "app.py" ]
