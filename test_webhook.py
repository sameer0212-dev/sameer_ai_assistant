import requests


user_message = "Can you tell me about black holes in 3-4 lines"

request_message = {"message": user_message}

url = "https://sameeraestics.app.n8n.cloud/webhook-test/f443cb9e-7724-4f7a-98c1-4c73ebe9e7c5"

response = requests.post(url, json=request_message)

print(response.status_code)

print(response.json()[0]["output"])