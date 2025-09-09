package br.com.moveon;

public class AccessApplicationExample {

    public static void main(String[] args) throws InterruptedException {
        Logger logger = new Logger();
        System.out.println(logger.title);

        // Usuário "Joao" acessa a aplicação
        Thread.sleep(1000);
        logger.info("Usuário 'Joao' acessou a aplicação.");

        logger.info("Página inicial carregada para o usuário 'Joao'.");
        Thread.sleep(1000);

        logger.warn("Usuário 'Joao' tentou acessar a página de administração sem permissão.");
        Thread.sleep(3000);

        // Tentativas de login inválidas com o usuário "admin"
        logger.warn("Tentativa invalida, usuario: joão não autorizado.");
        Thread.sleep(1000);

        logger.warn("Tentativa invalida, usuario: joão não autorizado.");
        Thread.sleep(1000);

        logger.warn("Tentativa invalida, usuario: joão não autorizado.");
        Thread.sleep(1000);

        // Bloqueio após múltiplas falhas
        logger.fatal("Usuário 'Joao' bloqueado após múltiplas tentativas inválidas de acesso.");
        Thread.sleep(3000);

        logger.info("Usuário 'Joao' foi desconectado da aplicação.");
        Thread.sleep(1000);
    }
}
