
package com.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
//@EnableScheduling
@EnableEurekaClient
public class PaymentNewApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentNewApplication.class, args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

//    @Autowired
//    private PayRepos repo;
//
//    @Scheduled(initialDelay = 1000L, fixedDelay = 2000L)
//    void addDue() {
//        Payment payment = new Payment();
//        payment.setDueAmount(5000);
//        repo.save(payment);
//    }

}
