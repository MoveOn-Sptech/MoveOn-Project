package br.com.moveon;

public class ETLProcessExample {

    public static void main(String[] args) throws InterruptedException {
        Logger logger = new Logger();
        logger.init();

        logger.info("Iniciando processo ETL para os dados de acidentes da base ARTESP.");

        logger.info("Lendo arquivo de entrada: file.csv.");

        logger.info("Iniciando etapa de transformação e normalização dos dados.");

        logger.warn("Foram identificadas 106 colunas ausentes no conjunto de dados.");

        logger.info("Transformação e normalização concluídas com sucesso.");

        logger.info("Carregando dados normalizados para o bucket S3.");

        logger.info("Upload dos dados concluída com sucesso.");

        logger.info("Processo ETL finalizado.");
    }
}
