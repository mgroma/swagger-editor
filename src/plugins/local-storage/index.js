import YAML from '@kyleshockey/js-yaml'
const CONTENT_KEY = "swagger-editor-content"
const CONTENT_KEY_JSON = "swagger-editor-content-json"

let localStorage = window.localStorage

export const updateSpec = (ori) => (...args) => {
  let [spec] = args
  ori(...args)
  saveContentToStorage(spec)
}

export default function(system) {
  // setTimeout runs on the next tick
  setTimeout(() => {
    if(localStorage.getItem(CONTENT_KEY)) {
      //MG: don't save
      // system.specActions.updateSpec(localStorage.getItem(CONTENT_KEY))
    } else if(localStorage.getItem("ngStorage-SwaggerEditorCache")) {
      // Legacy migration for swagger-editor 2.x
      try {
        let obj = JSON.parse(localStorage.getItem("ngStorage-SwaggerEditorCache"))
        let yaml = obj.yaml
        //MG: don't save
        // system.specActions.updateSpec(yaml)
        saveContentToStorage(yaml)
        localStorage.setItem("ngStorage-SwaggerEditorCache", null)
      } catch(e) {
        //MG: don't save
        // system.specActions.updateSpec(PetstoreYaml)
      }
    } else {
        //MG: don't save
      // system.specActions.updateSpec(PetstoreYaml)
    }
  }, 0)
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec
        }
      }
    }
  }
}

function saveContentToStorage(str) {
  let jsContent;
  if (str) {
    jsContent = JSON.stringify(YAML.safeLoad(str));
  }
  localStorage.setItem(CONTENT_KEY_JSON, jsContent)
  return localStorage.setItem(CONTENT_KEY, str)
}
