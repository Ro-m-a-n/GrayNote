const API_URL = "https://quintadb.com.ua/apps/";
const formId = "cEfCooW5jcL4ZcLgdcGgaR";
const app_id = "cQW7WJkaHcI4oDn2OUW4um";
const API_KEY = "afjSkBW5rgcQ8QWRX6WQPo";

export const getNotesAPI = async () => {
  try {
    let res = await fetch(
      API_URL +
        `${app_id}/dtypes/entity/${formId}.json?rest_api_key=${API_KEY}&amp;view=`
    );
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const createNoteAPI = async () => {
  try {
    let res = await fetch(API_URL + `${app_id}/dtypes.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        rest_api_key: API_KEY,
        values: {
          entity_id: formId,
          dcSdutWOLaWQHznSkZmmoW: "New note",
        },
      }),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const deleteNoteAPI = async (id: string) => {
  try {
    await fetch(API_URL + `${app_id}/dtypes/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        rest_api_key: API_KEY,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateNoteAPI = async (currentId: string, newNote: string) => {
  try {
    await fetch(API_URL + `${app_id}/dtypes/${currentId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        rest_api_key: API_KEY,
        values: {
          dcSdutWOLaWQHznSkZmmoW: newNote,
        },
      }),
    });
  } catch (e) {
    console.log(e);
  }
};
