# MoveOn-Project
Esse repositório tem por finalidade a centralização de código e artefatos do projeto MoveOn.

## Conventional Commits(Padrão de nossos commits)

### git commit -m "feat:.." 
```bash
feat: de upload de arquivos csv para atualização da metrica 
```
Utilizado para adicionar uma nova funcionalidade ou uma nova implementação ao código. 

---

### git commit -m "fix:.." 
```bash
fix: bug de loop infinito da pagina login  
```
Indica que um bug ou um problema foi corrigido. 

---

### git commit -m "docs:.." 
```bash
docs: atualizando contexto para detalhar mercado e diretrizez do artesp  
```
Usado para mudanças que afetam apenas arquivos de documentação, como o README. 

---

### git commit -m "style:.." 
```bash
style: criando efeitos de animação do login e cadastro no momento de estado de sucesso com 'toast'  
```
Para alterações na formatação do código que não afetam sua lógica, como indentação, espaçamento ou remoção de comentários. 

---

### git commit -m "refactor:.." 
```bash
refactor: código de UserController seguindo padrão de 'already return' e 'async/await'  
```
Usado quando o código é modificado sem adicionar novas funcionalidades ou corrigir bugs. 

---

### git commit -m "perf:.." 
```bash
perf: criando views para consulta de metricas da dashboard principal com indexação de tabelas 
```
Indica uma alteração de código que melhora o desempenho da aplicação, como otimização de consultas de banco de dados.

---

### git commit -m "test:.." 
```bash
test: criando teste unitario do serviço de autenticação de administrador
```
Para adicionar ou modificar testes, incluindo testes unitários e de integração. 
chore:
