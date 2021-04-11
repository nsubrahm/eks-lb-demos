
TLS termination at NLB with NGINIX Ingress Controller. `curl` invokes `https` end-point and traffic is routed to `https` server.

```bash
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.45.0/deploy/static/provider/aws/deploy-tls-termination.yaml
kubectl apply -f deploy-tls-termination.yaml
```