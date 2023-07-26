Context API -> in react is used to access data across various components.
Meeting provider : It is the context provider - similar to CXontext AP.
Parameters : config and token
One provider can be connected to many consumers.

Meeting Consumer: 

useMeeting: It is meeting react hook API for meeting. It includes all the information related to meeting such as join, leave, enable/disable mic or webcam etc.

useParticipant: It is participant hook API. useParticipant hook is responsible to handle all the events and props related to one particular participant such as name, webcamStream, micStream etc.

Meeting Context helps to listen on all the changes when participant joines meeting or changes mic or camera etc.

These all are provided by the videSDK

Join screen will work as medium to either schedule new meeting or to join existing meeting as a host or as a viewer.
