from fastapi import FastAPI, Body
from typing import Any
import uvicorn
import logging

app = FastAPI()
logger = logging.getLogger("uvicorn.error")

state_dict = {"pick_items": [], "states": {}, "start": "no"}


def add_item_to_state_dict(idx, key_, value):
    if idx not in state_dict["states"].keys():
        state_dict["states"][idx] = {}
    state_dict["states"][idx][key_] = value


@app.get("/")
def root():
    return state_dict


@app.post("/api/point")
def post_api_point(item: Any = Body(...)):
    logger.debug("this is a debug message")
    if item["content"] != "null":
        state_dict["pick_items"].append(item["content"])  # legacy
    add_item_to_state_dict(idx=item["idx"], key_="point", value=item["content"])
    state_dict["start"] = "yes"
    return {"status": f"received: {str(item['content'])}"}


@app.post("/api/tts")
def post_api_tts(item: Any = Body(...)):
    add_item_to_state_dict(idx=item["idx"], key_="tts", value=item["content"])
    state_dict["start"] = "yes"
    return {"status": f"received: {str(item['content'])}"}


@app.get("/dev/sample")
def dev_sample():
    global state_dict
    state_dict["pick_items"] = ["pick", "flip"]
    state_dict["start"] = "yes"
    return {"status": "success"}


@app.get("/dev/revert")
def dev_revert():
    global state_dict
    state_dict = {"pick_items": [], "states": {}, "start": "no"}

    return {"status": "success"}


@app.get("/api/pick_items/poplist")
def api_poplist():
    state_dict["pick_items"].pop()
    return {"status": "success"}


if __name__ == "__main__":
    uvicorn.run(app)
