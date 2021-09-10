# ng-mfe-shell-example

A simple angular shell that receives the information from a remote JSON and builds the MFE classes, with which loadRemoteEntry and loadRemoteModule from angular-architects / module-federation is executed.

The next entry point has the JSON with the MFE1 configuration, a simple application with the webpack configuration: <https://api.npoint.io/2497500d37e3a26487d1>. MFE1 is hosted in <https://carlosbayarri.github.io/ng-mfe-example/mfe1>

The goal of this example is to implement a get call to receive the configuration of different applications at the start time of the shell application.

##  Pitchfalls

###  Never expose the AppModule

``
The AppModule of your remote app should be your "demo" or self-deployed landscape. You will import modules and providers to establish a foundation to locally test your remote app in isolation. The AppModule should have a separate module of the cohesive functionality you are wanting to expose, i.e: LoginModule.

With this approach, exposing and pulling in AppModule has the potential to pulling in duplicate root providers; as well as pulling duplicate assets and styles.
``
