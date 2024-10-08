# Tree Processing

A simple tree processing service that can execute a list of actions.

## Installation

Install packages with yarn:

```bash
yarn install
```

Run locala dev server:

```bash
yarn dev
```

## Actions

### Send SMS

```bash
curl -XPOST -H "Content-Type:application/json" -d '{"actions": [{"type":"send_sms", "data": {"phone":"+12345678", "text":"hello"}}]}' http://localhost:3000/actions
```

### Send Email

```bash
curl -XPOST -H "Content-Type:application/json" -d '{"actions": [{"type":"send_email", "data": {"sender":"alex@example.com", "recipient":"bob@example.com", "subject": "Welcome Bob", "body": "Hi, nice to meet ya."}}]}' http://localhost:3000/actions
```

### Loop

```bash
curl -XPOST -H "Content-Type:application/json" -d '{ "actions": [ { "type":"loop", "data": { "times":2, "action": { "type":"send_sms", "data": {"phone":"+12345678", "text":"hello"} } } } ]}' http://localhost:3000/actions
```

### Condition

```bash
curl -XPOST -H "Content-Type:application/json" -d '{ "actions": [ { "type":"condition", "data": { "condition": "Math.random() < 0.5", "trueAction": { "type":"send_sms", "data": {"phone":"+12345678", "text":"hello"} }, "falseAction": { "type":"send_email", "data": { "type":"send_email", "data": { "sender":"alex@example.com", "recipient":"bob@example.com", "subject": "Welcome Bob", "body": "Hi, nice to meet ya." } } } } } ]}' http://localhost:3000/actions
```
