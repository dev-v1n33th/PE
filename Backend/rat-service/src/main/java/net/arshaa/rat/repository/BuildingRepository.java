package net.arshaa.rat.repository;



import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import net.arshaa.rat.entity.Buildings;

public interface BuildingRepository extends JpaRepository<Buildings, Integer> {

	Buildings getBuildingNameByBuildingId(int buildingId);
//@Procedure(name = "GUEST_COUNT")
//int getBuilding (@Param ("BUILDING_ID") int buildingId);

/*
 * @Procedure(procedureName = "GET_TOTAL_CARS_BY_MODEL") int
 * getTotalCarsByModelProcedureName(String model);
 */
}
