package br.com.moveon.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Log {
    private static final DateTimeFormatter LOG_DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd:hh-mm-ss");
    private static final String ANSI_RESET = "\u001B[0m";
    private static final String ANSI_RED = "\u001B[31m";
    private static final String ANSI_GREEN = "\u001B[32m";
    private static final String ANSI_YELLOW = "\u001B[33m";
    private static final String ANSI_BLUE = "\u001B[34m";
    private static final String ANSI_PURPLE = "\u001B[35m";
    private static final String ANSI_CYAN = "\u001B[36m";
    private static final String ANSI_WHITE = "\u001B[37m";

    public static String create(
            TypeLog typeLog,
            LevelLog levelLog,
            String description
    ) {
        LocalDateTime createTimeStampLog = LocalDateTime.now();
        System.out.println();

        String color = ANSI_WHITE;

        if (levelLog.equals(LevelLog.WARNING)) {
            color = ANSI_YELLOW;
        } else if (levelLog.equals(LevelLog.ERROR) || levelLog.equals(LevelLog.FATAL)) {
            color = ANSI_RED;
        } else if (levelLog.equals(LevelLog.INFO)) {
            color = ANSI_WHITE;
        }

        String templateLog = "%s %s  %s-%s --- [moveon] : %s %s";
        return templateLog.formatted(color, createTimeStampLog.format(LOG_DATE_TIME_FORMATTER), typeLog, levelLog.toString(), description, ANSI_RESET);
    }
}
