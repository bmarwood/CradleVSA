package ca.cmpt373.earth.cradle.Controllers;


import ca.cmpt373.earth.cradle.Models.Location;
import ca.cmpt373.earth.cradle.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/all")
    public List listAllLocations() { return this.locationRepository.findAll(); }

    @PostMapping("/add")
    public Location createLocation(@RequestBody Location location) {
        locationRepository.save(location);
        return location;
    }

    @DeleteMapping("/delete/{locationId}")
    public String deleteById(@PathVariable String locationId) {
        locationRepository.deleteById(locationId);
        return locationId;
    }

}
