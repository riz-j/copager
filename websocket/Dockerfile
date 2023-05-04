FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8088

CMD ["python3", "__main__.py"]