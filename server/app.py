from fastapi import FastAPI, Body
from typing import Any
import uvicorn

app = FastAPI()

state_dict = {
        "pick_items": [],
        "start": "no"
        }

@app.get("/")
def root():
    return state_dict

@app.post("/api/point")
def post_api_point(item: Any = Body(...)):
    if item["content"] != "null":
        state_dict["pick_items"].append(item["content"])
    state_dict["start"] = "yes"
    return {"status":f"received: {str(item['content'])}"}

@app.get("/dev/sample")
def dev_sample():
    global state_dict
    state_dict["pick_items"] = ["pick", "flip"]
    state_dict["start"] = "yes"
    return {"status":"success"}

@app.get("/dev/revert")
def dev_revert():
    global state_dict
    state_dict = {
        "pick_items": [],
        "start": "no"
        }
    return {"status": "success"}

@app.get("/api/pick_items/poplist")
def api_poplist():
    state_dict["pick_items"].pop()
    return {'status': 'success'}


if __name__ == "__main__":
    uvicorn.run(app)
