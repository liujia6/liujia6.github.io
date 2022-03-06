
# grpc


## RPC
RPC（Remote Procedure Call）：RPC是指远程过程调用，也就是说两台服务器A，B，一个应用部署在A服务器上，想要调用B服务器上应用提供的函数/方法，由于不在一个内存空间，不能直接调用，需要通过网络来表达调用的语义和传达调用的数据。

### 关键技术
- 服务寻址：Call ID映射
  - 所有函数必须有自己的一个ID，在远程过程调用时，必须附上此ID然后分别维护一个函数和ID的map
  - 一般使用函数字符串或者整数ID
- [序列化与反序列化](https://tech.meituan.com/2015/02/26/serialization-vs-deserialization.html)
  - 客户端如何把参数值传给远程端函数呢，在本地调用时，我们只需要把参数压到栈里，然后函数自己去栈里读，但是远程过程调用是不同的进程，甚至不同的语言，所以需要把数据参数转换为二进制字节流，然后服务端再反序列化将字节流转化为可读数据格式
- 网络传输
  - 远程调用往往通过网络传输，需要网络传输层
  - 作用：将call id和序列化后端参数字节流传给服务端，然后把序列化后的调用结果传回客户端
  - 大部分RPC框架使用TCP、不过UDP和HTTP2也可以

### 使用场景

- 在微服务、分布式已经成为日常的今天，服务通常都部署在不同的服务器，服务器也在不同地区，这时候就存在跨地域跨服务器调用问题，RPC即用于这样类似的情况。能解决分布式系统中，服务之间的调用问题。
- REST调用及测试都很方便，RPC就显得有点繁琐，但是RPC的效率是毋庸置疑的，所以建议在多系统之间的内部调用采用RPC。对外提供的服务，Rest更加合适。

# [PB](https://developers.google.com/protocol-buffers/docs/javatutorial#the-protocol-buffer-api)： Protocol Buffers 

google开源项目。序列化数据结构的方案，通常用于编写需要数据交换或者需要存储数据的程序。 这套方案包含一种用于描述数据结构的接口描述语言（Interface Description Language）和一个生成器， 用于生成描述该数据结构的不同编程语言的源代码。

### 优点

-   性能

    -   体积小，序列化后，数据大小可缩小3-10倍
    -   序列化速度快，比XML和JSON快20-100倍
    -   传输速度快，因为体积小，传输起来带宽和速度会有优化

-   使用

    -   使用简单，proto编译器自动进行序列化和反序列化
    -   维护成本低，多平台仅需维护一套对象协议文件(.proto)
    -   向后兼容性(扩展性)好，不必破坏旧数据格式就可以直接对数据结构进行更新
    -   加密性好，Http传输内容抓包只能看到字节

-   使用范围：跨平台、跨语言(支持[Java, Python, Objective-C, C+, Dart, Go, Ruby, and C#等](https://gitee.com/link?target=https%3A%2F%2Fdevelopers.google.com%2Fprotocol-buffers%2Fdocs%2Ftutorials)），可扩展性好

### 缺点

-   功能，不适合用于对基于文本的标记文档（如HTML）建模，因为文本不适合描述数据结构
-   通用性较差：json、xml已成为多种行业标准的编写工具，而Protobuf只是Google公司内部的工具
-   自解耦性差：以二进制数据流方式存储（不可读），需要通过.proto文件才能了解到数据结构

### 应用场景

-   传输数据量大 & 网络环境不稳定 的数据存储、RPC 数据交换 的需求场景 如 即时IM （QQ、微信）的需求场景
-   在传输数据量较大的需求场景下，Protobuf比XML、Json 更小、更快、使用 & 维护更简单！
-   AS中就有使用protobuf，参见文件Android Studio\lib\protobuf-java-3.4.0.jar

### 使用
1. 编写proto文件定义数据格式
2. 使用proto编译器将proto编译器编译成对应的调用方和使用方语言，使得该数据结构能勾自动序列化和反序列化读写
3. 第三步，调用接口实现序列化、反序列化以及读写。
## 参考
- [pb使用介绍和原理](https://gitee.com/chenjim/ProtoBuf)
- [pb文件命名规范](https://www.jianshu.com/p/8c55fb0a09b5)
- [官方语法指南](https://developers.google.com/protocol-buffers/docs/proto)
- 官方开源地址 ：[https://github.com/protocolbuffers/protobuf](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fprotocolbuffers%2Fprotobuf)
- [序列化方案对比](https://cloud.tencent.com/developer/article/1825169)
# [GRPC](https://grpc.io/docs/what-is-grpc/introduction/)

gRPC 是一个高性能、开源的、通用的、面向移动端的 RPC 框架，传输协议基于 HTTP/2，这意味着它支持 双向流、流控、头部压缩、单 TCP 连接上的请求多路复用 等特性。
- a language and platform-neutral open source RPC system developed at Google.
- 在 gRPC 中，客户端应用程序可以直接调用不同机器上的服务器应用程序上的方法，就像它是本地对象一样，使您可以更轻松地创建分布式应用程序和服务。
- gRPC默认使用[协议缓冲区](https://developers.google.com/protocol-buffers/docs/overview)作为其接口定义语言 ( **IDL** ) **和其底层消息交换格式**

优点

- 使用HTTP2流式
- 使用protobuff  IDL （明确的类型定义，以及序列化信息，提高性能）
- 跨语言框架 高拓展性
- 一个高性能RPC框架

### GRPC主要使用场景：

  - 低延迟、高度可扩展的分布式系统。
  - 开发与云服务器通信的移动客户端。
  - 设计一个需要准确、高效且独立于语言的新协议。
  - 分层设计以启用扩展，例如。身份验证、负载平衡、日志记录和监控等。

#### 服务定义

与许多 RPC 系统一样，gRPC 基于定义服务的思想，指定可以通过参数和返回类型远程调用的方法。默认情况下，gRPC 使用[协议缓冲区](https://developers.google.com/protocol-buffers)作为接口定义语言 (IDL)，用于描述服务接口和有效载荷消息的结构。如果需要，可以使用其他替代方案。

```proto
service HelloService {
  rpc SayHello (HelloRequest) returns (HelloResponse);
}

message HelloRequest {
  string greeting = 1;
}

message HelloResponse {
  string reply = 1;
}
```

gRPC 允许您定义四种服务方法：

- 一元 RPC，客户端向服务器发送单个请求并返回单个响应，就像普通的函数调用一样。

  ```proto
  rpc SayHello(HelloRequest) returns (HelloResponse);
  ```

- 服务器流式 RPC，客户端向服务器发送请求并获取流以读取一系列消息。客户端从返回的流中读取，直到没有更多消息。gRPC 保证单个 RPC 调用中的消息排序。

  ```proto
  rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse);
  ```

- 客户端流式 RPC，其中客户端写入一系列消息并将它们发送到服务器，再次使用提供的流。一旦客户端完成写入消息，它等待服务器读取它们并返回其响应。gRPC 再次保证单个 RPC 调用中的消息排序。

  ```proto
  rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse);
  ```

- 双向流式 RPC，其中双方使用读写流发送一系列消息。这两个流独立运行，因此客户端和服务器可以按照他们喜欢的任何顺序进行读写：例如，服务器可以在写入响应之前等待接收所有客户端消息，或者它可以交替读取消息然后写入消息，或其他一些读取和写入的组合。保留每个流中消息的顺序。

  ```proto
  rpc BidiHello(stream HelloRequest) returns (stream HelloResponse);
  ```

从`.proto`文件中的服务定义开始，gRPC 提供了协议缓冲区编译器插件，用于生成客户端和服务器端代码。gRPC 用户通常在客户端调用这些 API，并在服务器端实现相应的 API。

## gRPC-web
gRPC 在前端運作最大的問題，就是前端對於 gRPC 所使用的 protocol 不是那麼完好的支援，現在主流瀏覽器使用HTTP1.1，而 gRPC 使用的是更加高效的HTTP2。

那該怎麼解決，Google 提供的解決方案是利用一個 proxy 架設在後端，將前端所有的 HTTP1.1 流量轉換成 HTTP2

## 推荐使用gRPC的场景
gRPC非常适合以下场景：

- 微服务 - gRPC设计为低延迟和高吞吐量通信。gRPC非常适用于效率至关重要的轻型微服务。
- 点对点实时通信 - gRPC对双向流媒体提供出色的支持。gRPC服务可以实时推送消息而无需轮询。
- 多语言混合开发环境 - gRPC工具支持所有流行的开发语言，使gRPC成为多语言开发环境的理想选择。
- 网络受限环境 - 使用Protobuf（一种轻量级消息格式）序列化gRPC消息，gRPC消息始终小于等效的JSON消息。

## 不建议使用gRPC的场景
在以下场景中，建议使用其他框架而不是gRPC：

- 浏览器可访问的API - 浏览器不完全支持gRPC。gRPC-Web可以提供浏览器支持，但它有局限性并引入了服务器代理。
- 广播实时通信 - gRPC支持通过流媒体进行实时通信，但不存在向已注册连接广播消息的概念。
- 进程间通信 - 进程必须承载HTTP/2服务才能接受传入的gRPC调用。对于Windows，进程间通信管道是一种快速，轻量级的通信方法。
