package br.com.moveon;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Logger {
    String version = "2.0.0";
    String title = """
             __  __  _____     _______ ___  _   _        _     ___   ____\s
            |  \\/  |/ _ \\ \\   / / ____/ _ \\| \\ | |      | |   / _ \\ / ___|
            | |\\/| | | | \\ \\ / /|  _|| | | |  \\| |      | |  | | | | |  _\s
            | |  | | |_| |\\ V / | |__| |_| | |\\  |      | |__| |_| | |_| |
            |_|  |_|\\___/  \\_/  |_____\\___/|_| \\_|      |_____\\___/ \\____|
            
            :: MoveOn Log ::                                      (%s)
            """.formatted(version);

    //https://pt.wikipedia.org/wiki/ISO_8601#:~:text=A%20ISO%208601%20%C3%A9%20uma,tr%C3%AAs%20expans%C3%B5es%20mostradas%20s%C3%A3o%20v%C3%A1lidas.&text=O%20objetivo%20primordial%20da%20norma,padr%C3%B5es%20nacionais%20e%20lingu%C3%ADsticos%20existentes.
//    DateTimeFormatter LOG_DATE_TIME_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    String ANSI_RESET = "\u001B[0m";
    String ANSI_RED = "\u001B[31m";
    String ANSI_GREEN = "\u001B[32m";
    String ANSI_YELLOW = "\u001B[33m";
    String ANSI_BLUE = "\u001B[34m";
    String ANSI_PURPLE = "\u001B[35m";
    String ANSI_CYAN = "\u001B[36m";
    String ANSI_WHITE = "\u001B[37m";

    String create(
            String levelLog,
            String description
    ) {

        String ANSI_COLOR = switch (levelLog) {
            case "WARN" -> ANSI_YELLOW;
            case "ERROR", "FATAL" -> ANSI_RED;
            default -> ANSI_GREEN;
        };

        // concateção das cores
        levelLog = ANSI_COLOR.concat(levelLog.concat(ANSI_RESET));

        // https://medium.com/@AlexanderObregon/javas-instant-now-method-explained-5403bac7ec1e
        String createdAtFormated = Instant.now().toString();
        String templateLog = "%s %s --- [moveon] : %s";

        return templateLog.formatted(createdAtFormated, levelLog, description);
    }

    void info(
            String description
    ) {
        System.out.println(create("INFO", description));
    }

    void warn(
            String description
    ) {
        System.out.println(create("WARN", description));
    }

    void error(
            String description
    ) {
        System.err.println(create("ERROR", description));
    }

    void fatal(
            String description
    ) {
        System.err.println(create("FATAL", description));
    }

    void init() {
        System.out.println(title);
    }


}
