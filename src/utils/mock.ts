export const result = {
  "role": "assistant",
  "content": "```json\n[\n  {\n    \"type\": \"text\",\n    \"id\": \"heading-sign-in\",\n    \"tailwindClass\": \"absolute top-[40px] left-[50%] -translate-x-1/2 text-2xl font-bold text-center\",\n    \"properties\": {\n      \"value\": \"Sign in\"\n    },\n    \"children\": []\n  },\n  {\n    \"type\": \"rectangle\",\n    \"id\": \"logo-placeholder\",\n    \"tailwindClass\": \"absolute top-[100px] left-[50%] -translate-x-1/2 w-[100px] h-[100px] bg-gray-200 rounded-full\",\n    \"properties\": {},\n    \"children\": []\n  },\n  {\n    \"type\": \"rectangle\",\n    \"id\": \"email-field\",\n    \"tailwindClass\": \"absolute top-[240px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2\",\n    \"properties\": {},\n    \"children\": [\n      {\n        \"type\": \"text\",\n        \"id\": \"email-placeholder\",\n        \"tailwindClass\": \"text-gray-400 text-sm\",\n        \"properties\": {\n          \"value\": \"Email\"\n        },\n        \"children\": []\n      }\n    ]\n  },\n  {\n    \"type\": \"rectangle\",\n    \"id\": \"password-field\",\n    \"tailwindClass\": \"absolute top-[310px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2\",\n    \"properties\": {},\n    \"children\": [\n      {\n        \"type\": \"text\",\n        \"id\": \"password-placeholder\",\n        \"tailwindClass\": \"text-gray-400 text-sm\",\n        \"properties\": {\n          \"value\": \"Password\"\n        },\n        \"children\": []\n      }\n    ]\n  },\n  {\n    \"type\": \"rectangle\",\n    \"id\": \"sign-in-button\",\n    \"tailwindClass\": \"absolute top-[380px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-blue-500 rounded text-white text-center flex items-center justify-center cursor-pointer\",\n    \"properties\": {},\n    \"children\": [\n      {\n        \"type\": \"text\",\n        \"id\": \"sign-in-button-text\",\n        \"tailwindClass\": \"font-semibold\",\n        \"properties\": {\n          \"value\": \"Sign In\"\n        },\n        \"children\": []\n      }\n    ]\n  },\n  {\n    \"type\": \"text\",\n    \"id\": \"forgot-password\",\n    \"tailwindClass\": \"absolute top-[450px] left-[50%] -translate-x-1/2 text-sm text-blue-500 cursor-pointer\",\n    \"properties\": {\n      \"value\": \"Forgot password?\"\n    },\n    \"children\": []\n  },\n  {\n    \"type\": \"rectangle\",\n    \"id\": \"social-signin-section\",\n    \"tailwindClass\": \"absolute top-[520px] left-[50%] -translate-x-1/2 w-[300px] h-[100px] flex justify-between items-center\",\n    \"properties\": {},\n    \"children\": [\n      {\n        \"type\": \"rectangle\",\n        \"id\": \"facebook-signin\",\n        \"tailwindClass\": \"w-[90px] h-[40px] bg-blue-600 rounded flex items-center justify-center\",\n        \"properties\": {},\n        \"children\": [\n          {\n            \"type\": \"text\",\n            \"id\": \"facebook-signin-text\",\n            \"tailwindClass\": \"text-white text-xs font-bold\",\n            \"properties\": {\n              \"value\": \"Facebook\"\n            },\n            \"children\": []\n          }\n        ]\n      },\n      {\n        \"type\": \"rectangle\",\n        \"id\": \"google-signin\",\n        \"tailwindClass\": \"w-[90px] h-[40px] bg-red-600 rounded flex items-center justify-center\",\n        \"properties\": {},\n        \"children\": [\n          {\n            \"type\": \"text\",\n            \"id\": \"google-signin-text\",\n            \"tailwindClass\": \"text-white text-xs font-bold\",\n            \"properties\": {\n              \"value\": \"Google\"\n            },\n            \"children\": []\n          }\n        ]\n      },\n      {\n        \"type\": \"rectangle\",\n        \"id\": \"apple-signin\",\n        \"tailwindClass\": \"w-[90px] h-[40px] bg-black rounded flex items-center justify-center\",\n        \"properties\": {},\n        \"children\": [\n          {\n            \"type\": \"text\",\n            \"id\": \"apple-signin-text\",\n            \"tailwindClass\": \"text-white text-xs font-bold\",\n            \"properties\": {\n              \"value\": \"Apple\"\n            },\n            \"children\": []\n          }\n        ]\n      }\n    ]\n  }\n]\n```"
}

export const aiComponents = [
  {
    "type": "rectangle",
    "id": "logo",
    "position": { "x": 146, "y": 50 },
    "tailwindClass": "w-[100px] h-[100px] bg-gray-300 rounded-full",
    "properties": {},
    "children": []
  },
  {
    "type": "text",
    "id": "screen-title",
    "position": { "x": 146, "y": 170 },
    "tailwindClass": "text-2xl font-bold text-center",
    "properties": { "value": "Sign In" },
    "children": []
  },
  {
    "type": "rectangle",
    "id": "email-field",
    "position": { "x": 46, "y": 220 },
    "tailwindClass": "w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2",
    "properties": {},
    "children": [
      {
        "type": "text",
        "id": "email-placeholder",
        "position": { "x": 10, "y": 15 },
        "tailwindClass": "text-gray-400 text-sm",
        "properties": { "value": "Email" },
        "children": []
      }
    ]
  },
  // {
  //   "type": "rectangle",
  //   "id": "password-field",
  //   "position": { "x": 46, "y": 290 },
  //   "tailwindClass": "w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2",
  //   "properties": {},
  //   "children": [
  //     {
  //       "type": "text",
  //       "id": "password-placeholder",
  //       "position": { "x": 10, "y": 15 },
  //       "tailwindClass": "text-gray-400 text-sm",
  //       "properties": { "value": "Password" },
  //       "children": []
  //     }
  //   ]
  // },
  // {
  //   "type": "text",
  //   "id": "forgot-password-link",
  //   "position": { "x": 46, "y": 350 },
  //   "tailwindClass": "text-blue-500 text-sm underline",
  //   "properties": { "value": "Forgot Password?" },
  //   "children": []
  // },
  // {
  //   "type": "rectangle",
  //   "id": "sign-in-button",
  //   "position": { "x": 46, "y": 390 },
  //   "tailwindClass": "w-[300px] h-[50px] bg-blue-600 rounded",
  //   "properties": {},
  //   "children": [
  //     {
  //       "type": "text",
  //       "id": "sign-in-button-text",
  //       "position": { "x": 125, "y": 15 },
  //       "tailwindClass": "text-white text-lg",
  //       "properties": { "value": "Sign In" },
  //       "children": []
  //     }
  //   ]
  // },
  // {
  //   "type": "text",
  //   "id": "or-divider",
  //   "position": { "x": 186, "y": 460 },
  //   "tailwindClass": "text-gray-500 text-sm",
  //   "properties": { "value": "or" },
  //   "children": []
  // },
  // {
  //   "type": "rectangle",
  //   "id": "facebook-login-button",
  //   "position": { "x": 46, "y": 490 },
  //   "tailwindClass": "w-[300px] h-[50px] bg-blue-800 rounded flex items-center",
  //   "properties": {},
  //   "children": [
  //     {
  //       "type": "text",
  //       "id": "facebook-login-text",
  //       "position": { "x": 125, "y": 15 },
  //       "tailwindClass": "text-white text-lg",
  //       "properties": { "value": "Continue with Facebook" },
  //       "children": []
  //     }
  //   ]
  // },
  // {
  //   "type": "rectangle",
  //   "id": "google-login-button",
  //   "position": { "x": 46, "y": 550 },
  //   "tailwindClass": "w-[300px] h-[50px] bg-red-600 rounded flex items-center",
  //   "properties": {},
  //   "children": [
  //     {
  //       "type": "text",
  //       "id": "google-login-text",
  //       "position": { "x": 125, "y": 15 },
  //       "tailwindClass": "text-white text-lg",
  //       "properties": { "value": "Continue with Google" },
  //       "children": []
  //     }
  //   ]
  // }
]
