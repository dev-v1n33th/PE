package com.arshaa;

import com.arshaa.common.Bed;
import com.arshaa.entity.Guest;
import com.arshaa.entity.RatesConfig;
import com.arshaa.repository.GuestRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
@EnableScheduling
@EnableEurekaClient
public class GuestApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(GuestApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(GuestApplication.class, args);
    
       
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @Bean
	public ModelMapper  modelMapper()
	{
		return new ModelMapper();
	}
	
    

//    @Autowired
//    private static GuestRepository repo;
//    @Autowired
//    private static RatesConfigRepository rcRepo;
//    double amount=6700;
//    double dueAmount=0;
//
//
//    //@Scheduled(cron="*/5 * * * * MON-FRI")
//    @Scheduled(cron = "*/5 * * * * *")
//     public  void addDue() {
//    	Guest g=new Guest();
//    	
//    	List<Guest>getAllData=repo.findAll();
//    	getAllData.forEach(e->{
//    		double preDue=e.getDueAmount();
//    		RatesConfig rc=rcRepo.findByOccupancyTypeAndBuildingIdAndSharing(e.getOccupancyType(),e.getBuildingId(),e.getSharing());
//    		e.setDueAmount(preDue+rc.getPrice());
//    	});
    
}
