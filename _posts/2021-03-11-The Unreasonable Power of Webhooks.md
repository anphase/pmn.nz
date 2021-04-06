---
layout: post
title:  The Unreasonable Power of Webhooks
categories: productivity
date:   2021-03-11
---

Webhooks are powerful. By themselves, they are relatively simple but can be an integral part of very complex systems. The key to their power is the modularity of systems. A lot of services we use work together with other services to get the job done.

Say you have an online store. You may use one service for your storefront, another service for processing payments, another for generating invoices, accounting, reporting, tracking errors, support tickets, etc. Unless you use a service that does it all, you may need a simple way to connect these parts of your store. Webhooks can help with that.

At the core, webhooks are signals - callbacks made with an HTTP request. They are used to announce some event or state of one system to another system or multiple systems. They are like the long axons in the brain that carry signals from one region to another. While the signals may not necessarily hold a lot of data, they can represent a lot of information and get a lot done.

What makes webhooks great is that they are relatively simple to implement and utilise instead of APIs or sockets. Webhooks are event-driven, which makes them useful for a lot of things, but not all.

### Example time
Let's say that every time someone places an order in your store, you want to update a dashboard that you've set up. 
Now, let's say someone has just placed an order for $41.99 (so close!), and their invoice number is 01023. We'll call the values Amount and Invoice.
```
Amount = $41.99
Invoice = 01023
Key = ultra-SeCrEtE-key
```
You'll notice I added a 'Key' there. Using some key or token is one way of ensuring that the message originated from a source you trust.

The request sent from your storefront application to your dashboard app may look something like this, depending on how you chose to send it:
```
https://yourdashboard.app/orders?Amount=$41.99&Invoice=01023&Key=ultra-SeCrEtE-key
```
 And that's it. Your dashboard is updated every time there is an order placed. The simplicity of the webhook makes it a great way to connect different services. The complexities of the services used are hidden behind the simple structure of the interaction between the services using webhooks.