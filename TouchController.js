import UnityEngine;
import System.Collections;

public class TouchController extends MonoBehaviour {
//public class TouchController : MonoBehaviour {

	//public AudioClip rockSound;
  public var rockSound : AudioClip;
	//public GameObject wall;
  public var wall : GameObject;
	//public OVRInput.Controller Controller;
  public var Controller : OVRInput.Controller;
	//private AudioSource source;
  public var source : AudioSource;
	//public GameObject Player;
  public var Player : GameObject;

	//private Transform toLane;
  //private var 

	//private int wallCooldownCounterMax = 1000;
	//private int wallCooldownCounter = 1000;
	//private bool wallCooldown = false;
  
  private var wallCooldownCounterMax : int = 1000;
  private var wallCooldownCounter : int = 1000;
  private var wallCooldown : bool = false;



	// Update is called once per frame
	//void Update () {
  function Update() {
		transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
		transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);

		//Debug.Log (wallCooldownCounter.ToString ());


		if (Input.GetAxis("RHandTrigger") == 1 || Input.GetAxis("LHandTrigger") == 1) {
			//Debug.Log ("Right");
			if (!wallCooldown){
				Debug.Log (transform.position.ToString ());
        
        var dir : Vector3 = Player.transform.position - transform.position;
        dir = Player.transform.InverseTransformDirection(dir);
        var angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

        var radius : float = 5f;
        var newPointLocation : Vector2 = GetPointOnCircle(transform.position, radius, angle);
				//Vector3 direction = (toLane.transform.position - transform.position).normalized;
				//Vector3 distance = Vector3.Distance(

				GameObject createdWall = Instantiate(wall, newPointLocation, Quaternion.identity) as GameObject;
				wallCooldown = true;
			}




		}

		if (wallCooldown) {
			wallCooldownCounter--;
			if (wallCooldownCounter < 0) {
				wallCooldownCounter = wallCooldownCounterMax;
				wallCooldown = false;
			}
		}


		if (Input.GetButtonDown("Fire1")) {
		}

	}
  
   Vector2 GetPointOnCircle(Vector2 origin, float radius, float angle) {
 
        float angleInRadians = angle * Mathf.Deg2Rad;
 
        var x = origin.x + radius * Mathf.Sin(angleInRadians);
        var y = origin.y + radius * Mathf.Cos(angleInRadians);
 
        return new Vector2(x,y);
 
    }




}