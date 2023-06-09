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
    newNote !== "" && //server do not accept empty notes
      (await fetch(API_URL + `${app_id}/dtypes/${currentId}.json`, {
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
      }));
  } catch (e) {
    console.log(e);
  }
};

// let exampleOfServerResponse = {
//   records: [
//     {
//       id: "dcSCkkWRbfk4kBjaFdMSkB",
//       app_id: "bThWJcVmjlbBtcH8o9zmo_",
//       entity_id: "aHu8ozoejcLOtdK8kVvSom",
//       values: {
//         ddTSkIjunmWO5BDXfirrDx:
//           'Note value. lorem ipsum',
//       },
//       rel_values: null,
//       subform_values: {},
//       approved: false,
//       created_at: "2023-06-08T17:25:22.000Z",
//       updated_at: "2023-06-09T17:07:48.000Z",
//       added_by: "exampleexapmle@gmail.com",
//       user_ids: null,
//     },
//   ],
// };
