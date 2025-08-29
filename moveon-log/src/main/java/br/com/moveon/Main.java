package br.com.moveon;

import br.com.moveon.utils.LevelLog;
import br.com.moveon.utils.Log;
import br.com.moveon.utils.TypeLog;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        String titleLog = """
                 __  __  _____     _______ ___  _   _        _     ___   ____\s
                |  \\/  |/ _ \\ \\   / / ____/ _ \\| \\ | |      | |   / _ \\ / ___|
                | |\\/| | | | \\ \\ / /|  _|| | | |  \\| |      | |  | | | | |  _\s
                | |  | | |_| |\\ V / | |__| |_| | |\\  |      | |__| |_| | |_| |
                |_|  |_|\\___/  \\_/  |_____\\___/|_| \\_|      |_____\\___/ \\____|
                
                :: MoveOn Log ::                                           (v1.0.0)
                """;

        System.out.println(titleLog);

        // O usuário "Joao" acessa a aplicação
        Thread.sleep(1000);
        System.out.println(Log.create(TypeLog.AUTHENTICATION, LevelLog.INFO, "Acesso da aplicação pelo usuário Joao"));

        System.out.println(Log.create(TypeLog.ACCESS, LevelLog.INFO, "Página inicial carregada para o usuário Joao"));
        Thread.sleep(1000);

        System.out.println(Log.create(TypeLog.ACCESS, LevelLog.WARNING, "Usuário Joao tenta acessar página de administração sem permissão"));
        Thread.sleep(3000);

        // As tentativas de acesso com credenciais inválidas para "admin"
        System.out.println(Log.create(TypeLog.SECURITY, LevelLog.WARNING, "Tentativa de login com usuário 'admin'. Senha incorreta."));
        Thread.sleep(1000);

        System.out.println(Log.create(TypeLog.SECURITY, LevelLog.WARNING, "Tentativa de login com usuário 'admin'. Senha incorreta."));
        Thread.sleep(1000);

        System.out.println(Log.create(TypeLog.SECURITY, LevelLog.WARNING, "Tentativa de login com usuário 'admin'. Senha incorreta."));
        Thread.sleep(1000);

        // O sistema bloqueia o usuário após as tentativas falhas
        System.out.println(Log.create(TypeLog.SECURITY, LevelLog.FATAL, "Usuário 'Joao' bloqueado devido a múltiplas tentativas de acesso inválido"));
        Thread.sleep(3000);

        System.out.println(Log.create(TypeLog.AUTHENTICATION, LevelLog.INFO, "Desconectando o usuário 'Joao' da aplicação."));
        Thread.sleep(1000);
    }
}
