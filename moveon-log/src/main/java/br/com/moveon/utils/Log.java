package br.com.moveon.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Log {
    private  static  final DateTimeFormatter LOG_DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd:hh-mm-ss");

    public static String create(
            TypeLog typeLog,
            LevelLog levelLog,
            String description
    ){
        LocalDateTime createTimeStampLog = LocalDateTime.now();
        System.out.println();

        String templateLog = "%s  %s-%s --- [moveon] : %s";
        return templateLog.formatted(createTimeStampLog.format(LOG_DATE_TIME_FORMATTER), typeLog, levelLog, description);
    }
}
