#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <React/RCTBundleURLProvider.h>

#import <React/RCTLinkingManager.h>

#import <React/RCTLog.h>



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTSetLogThreshold(RCTLogLevelInfo);
  RCTAddLogFunction(ShakeLogFunction);
  self.moduleName = @"ProjectName";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions]; // added
  [RNSplashScreen show];  // here
  return didFinish; // added
}

RCTLogFunction ShakeLogFunction = ^(RCTLogLevel level, __unused RCTLogSource source, NSString *fileName, NSNumber *lineNumber, NSString *message) {
    NSString *log = RCTFormatLog([NSDate date], level, fileName, lineNumber, message);
    NSLog(@"%@", log);
};



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@end
