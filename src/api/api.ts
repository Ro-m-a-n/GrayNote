const API_URL = "https://quintadb.com.ua/apps/";
const formId = "aHu8ozoejcLOtdK8kVvSom";
const app_id = "bThWJcVmjlbBtcH8o9zmo_";
const API_KEY = "baWRNdR8jeDOo-lsvVodzn";

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
          ddTSkIjunmWO5BDXfirrDx: "New note",
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
          ddTSkIjunmWO5BDXfirrDx: newNote,
        },
      }),
    });
  } catch (e) {
    console.log(e);
  }
};
