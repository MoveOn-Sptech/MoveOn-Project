package br.com.moveon;

public class ETLProcessExample {

    public static void main(String[] args) throws InterruptedException {
        // conceitos utilizado: classes ,metodos, instancia e objeto
        // formatação de texto com .formatted
        // Instant => que serve para representar um instante qualquer.
        Logger logger = new Logger();

        logger.init();

        logger.info("Iniciando processo ETL para os dados de acidentes da base ARTESP.");
        Thread.sleep(1000);

        logger.info("Lendo arquivo de entrada: file.csv.");
        Thread.sleep(1000);

        logger.info("Iniciando etapa de transformação e normalização dos dados.");
        Thread.sleep(1000);

        logger.warn("Foram indentificado 106 colunas ausentes no conjunto de dados.");
        Thread.sleep(1000);

        logger.info("Transformação e normalização concluídas com sucesso.");
        Thread.sleep(1000);

        logger.info("Carregando dados normalizados para o bucket S3.");
        Thread.sleep(2000);

        logger.info("Upload dos dados concluída com sucesso.");
        Thread.sleep(1000);

        logger.info("Processo ETL finalizado com sucesso.");
    }
}
